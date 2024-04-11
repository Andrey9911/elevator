
export function callProcessing(Floor_Position, queue, elevator_){
    let floor =  Number(Object.keys((Object.fromEntries(Floor_Position))))
    if(elevator_.status === 'free'){
        elevator_.status = 'buzy';
        if(queue.size === 0) elevator_.currentFloor = floor;
        else elevator_.currentFloor = queue.prototype.values().next().value;
    } 
    else
    {
        queue.set(floor,Floor_Position.get(floor));
    }
    return elevator_.pos = Floor_Position.get(floor);
    setTimeout(()=>{
        elevator_.status = 'free';
        elevator_.currentFloor = undefined;
        // console.log(`status - ${elevator_.status}`);


    },3000);
    // console.log(`floor - ${elevator_.curr_Floor}`);
    // console.log(`status - ${elevator_.status}`);
    // console.log(queue, curr_floorPos);  
    
}