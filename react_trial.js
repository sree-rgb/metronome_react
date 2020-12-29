
class Time1 extends React.Component{
  constructor(props){
    super(props)
    this.state = {second1:1,run_state:'Start'};
  }
  inc(steps=4){
      if (this.state.second1==steps){
      this.setState((state,props) => ({
      second1:state.second1=1
        }
      ))

      }
      else{
      this.setState((state,props) => ({
      second1:state.second1+1
        }
      ))}
  }
  start_timer() {
    this.timerID = setInterval(
      () => this.inc(),
      1000
    );
    this.setState({run_state: 'Stop'});
  }
  render(){

    return (
    	<div>
    	<h1>{this.state.second1}</h1>
    	<button id="startbutton" onClick={()=>{
    		if(this.state.run_state=='Start') {
    			this.start_timer()
    		}
    		else{
    			clearInterval(this.timerID)
    			this.setState({run_state: 'Start'});
    		}
    	}}>{this.state.run_state}</button>
    	</div>
      )
  }
}
ReactDOM.render(
  <Time1 />,
  document.getElementById('root')
);