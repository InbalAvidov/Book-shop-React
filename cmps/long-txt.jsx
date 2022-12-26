const {useState,useEffect} = React

export function LongText({txt, length}){
const [isLongTxtShown, setLongTxtShown] = useState(false)
 function getTextToShow(){
    return (txt.length < +length || isLongTxtShown) ? txt : txt.substr(0, +length + 1) + '...'
 }
return <div>
    <p>{getTextToShow()}</p>
    <button onClick={()=>setLongTxtShown(!isLongTxtShown)}>{!isLongTxtShown ? 'Read More' : 'Read Less'}</button>
</div>
}