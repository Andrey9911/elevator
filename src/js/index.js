
export function callProcessing(Floor_Position, queue, elevator_){
    let floor =  Number(Object.keys((Object.fromEntries(Floor_Position))))
    console.log(`ВЫЗОВ. ФАЙЛ: index.js:  floor = ${floor}, quere with floor =  ${queue.get(floor)}`);

    console.log(queue);
    if(elevator_.status === 'free'){
        elevator_.status = 'buzy';
        if(queue.size === 0) elevator_.currentFloor = floor;
        else
        {
            elevator_.currentFloor = queue.keys().next().value;
            console.log(`ВЫЗОВ. ФАЙЛ: index.js: DELETE ELEMENT, num =  ${queue.get(floor)}`);
            queue.delete(floor);
            
        } 
    } 
    else
    {
        queue.set(floor,Floor_Position.get(floor));
    }
    // console.log(queue, Floor_Position);  

    return {
        isBuzy: queue.size === 0 ? false : true,
        positin: Floor_Position.get(floor),
        queue: queue
    }
}