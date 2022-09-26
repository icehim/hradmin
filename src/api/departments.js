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
