export const initialstate=0;

export const reducer = (state1 ,action)=>{
    //console.log(state+" "+action.type)
    if(action.type==="productsubmit")
    {return state1+1;}
}