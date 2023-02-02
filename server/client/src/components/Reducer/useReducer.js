export const initialstate=0;

export const reducer = (state ,action)=>{
    //console.log(state+" "+action.type)
    if(action.type==="submit")
    {return state+1;}
}