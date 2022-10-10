import request from '@/utils/request'
// 获取员工列表
export function sysUser(params) {
  return request({
    url: '/sys/user',
    params
  })
}
// 新增员工
export function sysUserPost(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

// 删除员工
export function sysUserDelete(id) {
  return request({
    // url: '/sys/user/' + id,
    url: `/sys/user/${id}`,
    method: 'delete'

  })
}

// 批量导入
export function sysUserBatch(data) {
  return request({
    url: `/sys/user/batch`,
    method: 'post',
    data
  })
}
// 修改用户基本信息
export function sysUserPut(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
// 获取员工个人详情
export function employeesPersonalInfo(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

//  修改员工个人详情
export function employeesPersonalInfoPut(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}
// 获取员工岗位详情
export function employeesJobs(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}
// 修改员工岗位详情
export function employeesJobsPut(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}

