import alert from '../components/alert'

export default function ({ $axios, redirect }) {
  $axios.onResponse(response => {
    const code = response.data.code
    switch (code) {
      case 0:
        return response.data
      case 1002:
        if (typeof window !== 'undefined') {
          setTimeout(() => {
            redirect(`/login?url=${encodeURIComponent(window.location.href)}`)
          }, 1000)
        }
      // eslint-disable-next-line no-fallthrough
      default:
        if (typeof window !== 'undefined') {
          alert({
            type: 'error',
            message: response.data.msg
          })
        }
        return response.data
    }
  })
}
