// eslint-disable-next-line import/no-anonymous-default-export
export default function (time) {
  const date = new Date(time)
  const Year = date.getFullYear()
  const Month = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '0' + date.getMonth() + 1
  const Day = date.getDate() > 10 ? date.getDate() : '0' + date.getDate()
  const Hour = date.getHours() > 10 ? date.getHours() : '0' + date.getHours()
  const Minute = date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes()
  const Second = date.getSeconds() > 10 ? date.getSeconds() : '0' + date.getSeconds()
  return `${Year}-${Month}-${Day} ${Hour}:${Minute}:${Second}`

}