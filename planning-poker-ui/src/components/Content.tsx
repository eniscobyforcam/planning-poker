import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useState } from 'react'
import Room from './Room'
import RoomSelection from './RoomSelection'
import Welcome from './Welcome'

const Content: React.FC = () => {
  const [view, setView] = useState("1")

  const handleViewChange = (e: SelectChangeEvent) => {
    setView(e.target.value)
  }

  const Switcher = () => {
    return (
      <FormControl fullWidth>
        <Select
          value={view}
          label='View'
          onChange={handleViewChange}
        >
          <MenuItem value={"1"}>Welcome</MenuItem>
          <MenuItem value={"2"}>Room selection</MenuItem>
          <MenuItem value={"3"}>Room</MenuItem>
        </Select>
      </FormControl>
    )
  }

  return (
    <>
      <Switcher />

      { view === "1" && <Welcome /> }

      { view === "2" && <RoomSelection /> }

      { view === "3" && <Room /> }
    </>
  )
}

export default Content
