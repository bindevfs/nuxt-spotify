import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { TimeUtil } from '~/utils/time-util'

dayjs.extend(relativeTime)

Vue.filter('durationToMinutes', function(duration) {
  const minutes = Math.floor(duration / 60000)
  const seconds = Math.trunc(((duration % 60000) / 1000))
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
})

Vue.filter('fromToNowDate', function(date) {
  if (date) {
    const diffMonth = dayjs().diff(date, 'month')
    if (diffMonth <= 1) {
      return dayjs(date).fromNow()
    }
    return dayjs(date).format('MMM DD, YYYY')
  }
  return ''
})

Vue.filter('duration', function(value) {
  if (!value) {
    return '';
  }
  return TimeUtil.formatDuration(value)
})
