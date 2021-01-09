


class Time1 extends React.Component{
  constructor(props){
	super(props)
	this.state = {current_step:1,run_state:'Start',current_bpm:60};
  }
	
	alerts(){
		const numbers=[1,2,3,4]
		const audios=numbers.map((number)=>{
			return 'audio'+number
		})
		const sources=numbers.map((number)=>{
			if (number ==1){
			return 'click1.wav'
			}
			else{
				return 'click2.wav'
			}
		})
		const listItems = numbers.map((number) => 
			<audio key={number} id={audios[number-1]}>
				<source src={sources[number-1]}/>

			</audio> );
		return (
			<div>
				{listItems}
			</div>
			)

	}
  inc(steps=4){
	// Increments the step number.
	// If step number is last sets it back to step 1 
	if (this.state.current_step==steps){
		this.setState((state,props) => ({
		current_step:state.current_step=1
			}
			)
		)
		document.getElementById('audio1').play()
	  }
	else{
		this.setState(
			(state,props) => ({
				current_step:state.current_step+1
				}
				)
		)
	document.getElementById('audio'+this.state.current_step).play()
		}
	// To update the speed of running timer
	if (this.state.current_bpm != this.props.bpm && this.state.run_state=='Stop'){
		this.start_timer()

	}	


	}
  clearTimer(){
		clearInterval(this.timerID)
	
  }
  start_timer() {
	// starts metronome
	this.clearTimer()
	this.timerID = setInterval(
	  () => this.inc(),
	  1000/(this.props.bpm/60)
	);
	this.setState({run_state: 'Stop'});
	this.setState({current_bpm:this.props.bpm})
  }
  render(){


	return (
		<div>
		<h1>{this.state.current_step}</h1>
		<button id="startbutton" onClick={()=>{
			if(this.state.run_state=='Start') {
				this.start_timer()
			}
			else{
				clearInterval(this.timerID)
				this.setState({run_state: 'Start'});
			}
		}}>{this.state.run_state}</button>
		{this.alerts()}
		</div>
	  )
  }
}
class Bpm extends React.Component{
	constructor(props){
		super(props)
		this.state={current_bpm:60}
	}
	componentDidMount() {
		let bpm=document.getElementById('bpm')
		bpm.onchange=()=>{
			this.setState({current_bpm:bpm.value})
		}
	}
	render(){
		return(
		<div>
			<label >BPM</label>

			<input type="number" id='bpm' min="0" max="200" placeholder='60'/> 
		<Time1 bpm={this.state.current_bpm} />
		</div>
		)
	}
}
ReactDOM.render(
  <Bpm/>,
  document.getElementById('root')
);