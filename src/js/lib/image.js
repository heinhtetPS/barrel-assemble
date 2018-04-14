import Layzr from 'layzr.js'
import {select, on, doesSupportObjectFit, addClass, getData, removeClass, setStyle, getStyle, hasClass } from 'lib/dom'

const loaded = el => {
  removeClass('is-loading', el)
  addClass('is-loaded', el)
  addClass('figure-loaded', el.parentNode)
  if (getData('bg', el)) {
    setStyle('backgroundImage', `url('${el.src}')`, el.parentNode)
  }
}

const setBgImg = (url, el) => setStyle('backgroundImage', `url(${url})`, el)

export default () => {
  const layzr = Layzr({
    normal: 'data-src',
    threshold: 200
  })
  const objectFit = doesSupportObjectFit()
  layzr.on('src:before', element => {
    addClass('is-loading', element)
  })

  layzr.on('src:after', element => {
    if (!objectFit && hasClass('image-cover', element) ) {
      const src = element.src
      const wrapperImg = element.parentNode
      addClass('no-object-fit',wrapperImg)
      setBgImg(src, wrapperImg)
    }

    if (element.complete) {
      loaded(element)
    } else {
      on('load', () => loaded(element), element)
    }
  })

  layzr.update().check().handlers(true)

  const wrapper = select('.js-wrapper')
  on('scroll', function () {
    layzr.check()
  }, wrapper)

  window.onload = () => layzr.check()

  on('lazyload', function () {
    layzr.check()
  }, wrapper)
}
