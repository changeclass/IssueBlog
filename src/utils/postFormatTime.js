// eslint-disable-next-line import/no-anonymous-default-export
export default function (time) {
  const date = new Date(time)
  const Year = date.getFullYear()
  const Month = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '0' + date.getMonth() + 1
  const Day = date.getDate() > 10 ? date.getDate() : '0' + date.getDate()
  return `${Year}-${Month}-${Day}`
}