import request from '@/utils/request'
// 获取组织架构数据
export function companyDepartment() {
  return request({
    url: '/company/department'
  })
}
// 获取员工列表
export function sysUserSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

// 新增部门
export function companyDepartmentPost(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
// 删除部门
export function companyDepartmentDelete(id) {
  return request({
    url: '/company/department/' + id,
    method: 'delete'
  })
}// 编辑部门
export function companyDepartmentUpdate(data) {
  return request({
    url: '/company/department/' + data.id,
    method: 'put',
    data
  })
}
