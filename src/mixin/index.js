import store from '@/store'
export const checkPermissionMiXin = {
  methods: {
    checkPermission(pointName) {
      return store.getters.points.indexOf(pointName) > -1
    }
  }
}
