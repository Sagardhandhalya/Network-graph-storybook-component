import React, { useState, useEffect } from 'react'
import GraphEdge from '../../components/GraphEdge/GraphEdge'
import GraphNode from '../../components/GraphNode/GraphNode'
import "./NetworkGraph.css"
const NetworkGraph = ({persons=[] , relations=[]}) => {
    console.log(persons,relations);
    const [personObjs, setPersonObjs] = useState([])
    const [active, setActive] = useState(false)
    const [offset, setOffset] = useState({})
    useEffect(() => {
            let x = 20, y = 150;
            let people = persons.map((p, i) => {
                if (i % 4 === 0 && i != 0) {
                    y += 100 + Math.random() * 100;
                    x = 200
                }
                else {
                    x += Math.random() * 100 + 150;
                }
                p.x = x + Math.random() * (50);
                p.y = y + + Math.random() * (100);
                return p
            }
            )
            setPersonObjs(people)
            console.log(people);
    }, [])

    const handleMounseDown = (e, person) => {
        const el= e.currentTarget;
        console.log(e.pointerId);
        const bbox = e.target.getBoundingClientRect();
        const x = e.clientX - bbox.left;
        const y = e.clientY - bbox.top;
        el.setPointerCapture(e.pointerId);
        setActive(true)
        setOffset({x,y})
    }

    const handleMounseDrag = (e, person) => {
        const bbox = e.target.getBoundingClientRect();
        const x = e.clientX - bbox.left;
        const y = e.clientY - bbox.top;
        if (active) {
            let persons = personObjs.map((p, i) => {
                if (p.id === person.id) {
                    p.x -=offset.x- x;
                    p.y -= offset.y-y;
                    return p;
                } else {
                    return p;
                }
            }
            )
            setPersonObjs(persons)
        }

    }

    const handleMounseUp = (e, person) => {
        console.log("uo");
        const el= e.target;
        el.releasePointerCapture(e.pointerId)
        setActive(false)
    }


    return (
        personObjs.length > 0 ? <div className="graphview__container">
            <svg className="main__svg">
                {relations.map((r, i) => {
                    console.log(r);
                    let p1 = personObjs.filter(p => p.id === r.p1)[0]
                    let p2 = personObjs.filter(p => p.id === r.p2)[0]
                    return <GraphEdge key={i} x1={p1.x + 10} x2={p2.x + 10} y1={p1.y + 10} y2={p2.y + 10} relation={r} />
                })}
                {personObjs.map((p, i) => {
                    console.log(p);
                    return <GraphNode key={i} cx={p.x}
                        cy={p.y} text={p.id} person={p}
                        up={handleMounseUp}
                        down={handleMounseDown}
                        move={handleMounseDrag}
                    />
                })}

            </svg>
        </div> : <h1>creating graph..</h1>
    )
}

export default NetworkGraph
