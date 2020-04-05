import React, { useState, useRef } from "react"
import { useTransition, useSpring, useChain, config } from "react-spring"

import { Global, Container, Item } from "./styles"

import data from "./data"

function App() {
  const [open, setOpen] = useState(false)

  const springRef = useRef()
  const { size, opacity, ...rest } = useSpring({
    ref: springRef,
    config: config.stiff,
    from: { size: "20%", background: "hotpink" },
    to: { size: open ? "100%" : "20%", background: open ? "white" : "hotpink" },
  })

  const transRef = useRef()
  const transitions = useTransition(open ? data : [], (item) => item.name, {
    ref: transRef,
    unique: true,
    trail: 400 / data.length,
    from: { opacity: 0, transform: "scale(0)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0)" },
  })

  /**
   * this will orchestrate the two animations above,
   * comment the last arg and it creates a sequence
   */
  useChain(open ? [springRef, transRef] : [transRef, springRef], [
    0,
    open ? 0.1 : 0.6,
  ])

  return (
    <>
      <Global />
      <Container
        style={{ ...rest, width: size, height: size }}
        onClick={() => setOpen((open) => !open)}
      >
        {transitions.map(({ item, key, props }) => (
          <Item key={key} style={{ ...props, background: item.css }} />
        ))}
      </Container>
    </>
  )
}

export default App
