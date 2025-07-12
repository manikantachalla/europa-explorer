import {
  Box, Button, Grid, TextField, Typography, Dialog, DialogTitle,
  DialogContent, DialogActions, List, ListItem, ListItemText
} from '@mui/material';
import { useState } from 'react';
import RobotInput from './RobotInput';

type RobotForm = {
  x: number;
  y: number;
  dir: string;
  instructions: string;
};

export default function SimulatorForm() {
  const [maxX, setMaxX] = useState(5);
  const [maxY, setMaxY] = useState(5);
  const [robots, setRobots] = useState<RobotForm[]>([
    { x: 1, y: 2, dir: 'N', instructions: 'LMLMLMLMM' }
  ]);
  const [results, setResults] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const addRobot = () => {
    setRobots([...robots, { x: 0, y: 0, dir: 'N', instructions: '' }]);
  };

  const updateRobot = (index: number, robot: RobotForm) => {
    const newRobots = [...robots];
    newRobots[index] = robot;
    setRobots(newRobots);
  };

  const simulate = async () => {
    const payload = {
      grid: [maxX, maxY],
      robots: robots.map(r => ({
        start: { x: r.x, y: r.y, dir: r.dir },
        instructions: r.instructions.trim().split('')
      }))
    };

    try {
      const res = await fetch('http://localhost:3000/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      setResults(data.results || []);
      setOpen(true);
    } catch (e) {
      alert('Error connecting to backend');
    }
  };

  return (
    <Box>
      <Typography variant="h6">Grid Size</Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <TextField
            fullWidth type="number" label="Max X"
            value={maxX} onChange={e => setMaxX(Number(e.target.value))}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth type="number" label="Max Y"
            value={maxY} onChange={e => setMaxY(Number(e.target.value))}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mt: 3 }}>Robots</Typography>
      {robots.map((robot, index) => (
        <RobotInput
          key={index}
          index={index}
          robot={robot}
          onChange={updated => updateRobot(index, updated)}
        />
      ))}

      <Button onClick={addRobot} variant="outlined" sx={{ mt: 2 }}>
        + Add Robot
      </Button>

      <Button onClick={simulate} variant="contained" fullWidth sx={{ mt: 4 }}>
        Simulate
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Simulation Results</DialogTitle>
        <DialogContent dividers>
          <List>
            {results.map((res, i) => (
              <ListItem key={i}>
                <ListItemText
                  primary={`Robot ${i + 1}`}
                  secondary={res}
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
