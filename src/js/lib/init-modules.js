import { tryCatch, identity, ifElse, getProp, pipe, partial } from 'lib/utils'
import { selectAll, getData } from 'lib/dom'
import 'babel-polyfill'

/**
 * Require a module by name
 *
 * @param {string} name
 * @return {Function|Object}
 */
const requireModule = (name) => require('modules/' + name)

/**
 * Handle exception
 *
 * @param {Error} err
 * @returns {boolean}
 */
const handleError = (err) => {
  console.log(err.toString())
  return false
}

/**
 * Check to see if a module is an ES6 wrapper
 *
 * @param {Function|Object} val
 * @return {boolean}
 */
const isEs6Module = (val) => typeof val === 'object' && typeof val.default !== 'undefined'

/**
 * Create new module instance for element
 *
 * @param {HTMLElement} el
 * @param {Function} Module
 * @returns {Module}}
 */
const runModule = (el, Module) => {
	if (Module) {
		new Module(el)
	} else {
		console.log(el)
	}
}

/**
 * Initialize module based on attribute name
 *
 * @param {HTMLElement} el
 * @returns {HTMLElement|Module}
 */
const initializeModuleForEl = (el) => {
  return pipe(
    getData('module-init'),
    tryCatch(requireModule, handleError),
    ifElse(isEs6Module, getProp('default'), identity),
    partial(runModule, el)
  )(el)
}

/**
 * Finds all elements with a "data-module-init" attribute
 * and calls the corresponding script
 *
 * @return {Array<HTMLElement|Object>}
 */
export default () => selectAll('[data-module-init]').map(initializeModuleForEl)
