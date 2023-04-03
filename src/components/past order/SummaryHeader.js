import cross from "../../images/cross.jpg"
function SummaryHeader() {
    
    return <header className="summary-header">Summary<img onClick={() => {
        // shouldShouldSummary(false)
        window.location.reload()
    }} style={{ float: 'right',height:"18px", position:"relative",right:"20px",top:"4px",cursor:"pointer"}} src={cross} alt="cross" /></header>

}
export default SummaryHeader