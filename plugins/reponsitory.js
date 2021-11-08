import api from '~/api'

export default (ctx, inject) => {
  Object.keys(api).forEach(key => {
    inject(key, api[key](ctx.$axios))
  })
}
