import employeesData from '@/api/constant/employees'

export default {
  formatterFormOf: function(str) {
    const result = employeesData.hireType.find((item) => {
      return item.id === str
    })
    // 通过返回值取出相应的字符值
    return result ? result.value : ' ---'
  }
}
