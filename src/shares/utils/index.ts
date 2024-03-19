export const buildClassName = (...array: Array<string | undefined>)=>{
  return array?.filter(item=>!!item)?.join(' ');
}

export const dropClassName = (...array: Array<string | undefined>)=>{
  return array?.filter(item=>!!item)?.join(' ');
}