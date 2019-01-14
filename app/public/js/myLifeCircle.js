import _ from 'lodash';

const baseOptions = {
  version: 'V16.3',
  getDerivedStateFromProps: {
    componentLastProps: 'componentLastProps',
    stateKeyInProps: 'stateKeyInProps'
  },
  shouldComponentUpdate: {
    componentLastProps: 'componentLastProps',
    stateKeyInProps: 'stateKeyInProps'
  }
};

let setBaseOptions = (path, value) => {
  if (_.isObject(path)) {
    _.forOwn(path, (v, k) => {
      _.set.call(undefined, baseOptions, k, v);
    });
  } else if (_.isString(path) || _.isArray(path)) {
    _.set.call(undefined, baseOptions, path, value);
  }
};

let getBaseOptions = (path) => {
  if (_.isNil(path)) return baseOptions;
  return _.get(baseOptions, path, undefined);
};

let getDerivedStateFromProps = ({
  componentName = 'TemplateJSX',
  nextProps = {},
  prevState = {},
  customReturn = null
} = {}) => {
  /*如果有自定义返回*/
  if (!_.isNil(customReturn)) {
    if (_.isFunction(customReturn)) return customReturn();
    if (_.isObject(customReturn)) return customReturn;
    return null;
  } else {
    /*判断是不是V16.3*/
    if (_.eq(baseOptions.version, 'V16.3')) {
      console.log(componentName + ' getDerivedStateFromProps ? nextProps', _.cloneDeep(nextProps));
      console.log(componentName + ' getDerivedStateFromProps ? prevState', _.cloneDeep(prevState));
      // 首先判断props
      let componentLastProps = {};
      if (!_.isEqual(nextProps, prevState[baseOptions.getDerivedStateFromProps.componentLastProps])) {
        componentLastProps[baseOptions.getDerivedStateFromProps.componentLastProps] = nextProps;
        console.log(
          componentName +
            ' getDerivedStateFromProps nextProps!=prevState.' +
            baseOptions.getDerivedStateFromProps.componentLastProps +
            ' ' +
            baseOptions.getDerivedStateFromProps.componentLastProps,
          componentLastProps
        );
      }
      let stateValueInPropsChange = {};
      if (
        _.isEqual(
          _.sortBy(nextProps[baseOptions.getDerivedStateFromProps.stateKeyInProps]),
          _.sortBy(prevState[baseOptions.getDerivedStateFromProps.stateKeyInProps])
        )
      ) {
        let propPick = _.pick(nextProps, nextProps[baseOptions.getDerivedStateFromProps.stateKeyInProps]);
        let statePick = _.pick(prevState, nextProps[baseOptions.getDerivedStateFromProps.stateKeyInProps]);
        if (!_.isEqual(propPick, statePick)) {
          console.log(componentName + ' getDerivedStateFromProps propPick!=statePick propPick', propPick);
          console.log(componentName + ' getDerivedStateFromProps propPick!=statePick statePick', statePick);
          stateValueInPropsChange = propPick;
        }
      }
      let stateWillChange = _.merge({}, componentLastProps, stateValueInPropsChange);
      _.isEmpty(stateWillChange) ? (stateWillChange = null) : null;
      console.log(componentName + ' getDerivedStateFromProps ? stateWillChange', stateWillChange);
      return stateWillChange;
    }
    return null;
  }
};

let shouldComponentUpdate = ({
  componentName = 'TemplateJSX',
  prevState = {},
  nextProps = {},
  nextState = {},
  nextContext = {},
  customReturn = null,
  propsShould = true,
  propsShouldReturn = null
} = {}) => {
  /*如果有自定义返回*/
  if (!_.isNil(customReturn)) {
    if (_.isFunction(customReturn)) return !!customReturn();
    if (_.isBoolean(customReturn)) return customReturn;
    return false;
  } else {
    /*判断是不是V16.3*/
    if (_.eq(baseOptions.version, 'V16.3')) {
      /*判断nextContext*/
      if (_.isNil(nextContext) || _.isEmpty(nextContext)) {
        console.log(componentName + ' shouldComponentUpdate nextContext=={} prevState', _.cloneDeep(prevState));
        console.log(componentName + ' shouldComponentUpdate nextContext=={} nextProps', _.cloneDeep(nextProps));
        console.log(componentName + ' shouldComponentUpdate nextContext=={} nextState', _.cloneDeep(nextState));
        // 首先判断props，如果props都没变，则无需render
        if (_.isEqual(nextProps, prevState[baseOptions.shouldComponentUpdate.componentLastProps])) {
          console.log(
            componentName +
              ' shouldComponentUpdate nextProps==prevState.' +
              baseOptions.shouldComponentUpdate.componentLastProps +
              ' ?',
            new Date()
          );
          return false;
        } else {
          // props变了，但是是不是state需要的改变了呢？
          if (_.eq(propsShould, false)) {
            return false;
          } else if (_.eq(propsShould, true)) {
            // 如果有props改变的自定义返回
            if (!_.isNil(propsShouldReturn)) {
              if (_.isFunction(propsShouldReturn)) return !!propsShouldReturn();
              if (_.isBoolean(propsShouldReturn)) return propsShouldReturn;
              return false;
            } else {
              if (
                _.isEqual(
                  _.sortBy(nextProps[baseOptions.shouldComponentUpdate.stateKeyInProps]),
                  _.sortBy(prevState[baseOptions.shouldComponentUpdate.stateKeyInProps])
                )
              ) {
                let prevStatePick = _.pick(prevState, prevState[baseOptions.getDerivedStateFromProps.stateKeyInProps]);
                let nextStatePick = _.pick(nextState, prevState[baseOptions.getDerivedStateFromProps.stateKeyInProps]);
                if (_.isEqual(prevStatePick, nextStatePick)) {
                  console.log(
                    componentName + ' shouldComponentUpdate prevStatePick==nextStatePick prevStatePick',
                    prevStatePick
                  );
                  return false;
                }
              }
              return true;
            }
          }
        }
      } else {
        return false;
      }
    }
    return false;
  }
};

export default {
  getBaseOptions: getBaseOptions,
  setBaseOptions: setBaseOptions,
  getDerivedStateFromProps: getDerivedStateFromProps,
  shouldComponentUpdate: shouldComponentUpdate
};
