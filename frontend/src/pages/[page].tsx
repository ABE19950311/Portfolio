
const PAGE_SIZE = 10

const range = (start:number,end:number,length=end-start+1)=>{
    return [...Array(length)].map((_,i)=>start+i)
}


export {}