
const CIRCLE_COLORS = [
  'circleRed',
  'circlePink',
  'circleYellow',
  'circleBlue',
  'circleNavy',
  'circleGreen',
  'circlePurple',
  'circleOrange',
]
const order = {
      orderId:1,
      tableNumber:2,
      guest:1,
      subTotal:40,
      discount:20,
      minAgo: new Date().getMinutes().toLocaleString(),
      date: new Date().toDateString(),
      timeInTheDay:"8am",
      items:[
        {
          foodName:"Tea",
          quantity:1,
          basePrice:40
        },
        {
          foodName:"Cafee",
          quantity:1,
          basePrice:40
        },
        {
          foodName:"Coconut",
          quantity:1,
          basePrice:40
        }
      ]
    }

function List(){
    return(

        <div>
            
        </div>

    );
}
export default List;