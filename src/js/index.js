
export function callProcessing(Floor_Position, queue, elevator_){
    console.log(Floor_Position);
    let floor =  Number(Object.keys((Object.fromEntries(Floor_Position))))
    if(elevator_.status === 'free'){
        elevator_.status = 'buzy';
        if(queue.size === 0) elevator_.currentFloor = floor;
        else
        {
            elevator_.currentFloor = queue.values().next().value;
            console.log(`DELETE ELEMENT ${queue.get(floor)}`);
            queue.delete(floor)
            
        } 
    } 
    else
    {
        queue.set(floor,Floor_Position.get(floor));
    }
    // console.log(queue, Floor_Position);  
    queue.delete(Floor_Position.get(floor));
    return {
        isBuzy: queue.size === 0 ? false : true,
        positin: Floor_Position.get(floor),
        queue: queue
    }
}