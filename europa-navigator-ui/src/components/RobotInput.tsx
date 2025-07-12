import { Box, Grid, TextField } from '@mui/material';

type RobotForm = {
  x: number;
  y: number;
  dir: string;
  instructions: string;
};

type Props = {
  index: number;
  robot: RobotForm;
  onChange: (robot: RobotForm) => void;
};

export default function RobotInput({ index, robot, onChange }: Props) {
  return (
    <Box sx={{ mt: 2, p: 2, border: '1px dashed #ccc', borderRadius: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            fullWidth label={`Robot ${index + 1} - X`} type="number"
            value={robot.x} onChange={e => onChange({ ...robot, x: Number(e.target.value) })}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth label="Y" type="number"
            value={robot.y} onChange={e => onChange({ ...robot, y: Number(e.target.value) })}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth label="Direction (N/E/S/W)"
            value={robot.dir}
            inputProps={{ maxLength: 1 }}
            onChange={e => onChange({ ...robot, dir: e.target.value.toUpperCase() })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth label="Instructions (L/R/M)"
            value={robot.instructions}
            onChange={e => onChange({ ...robot, instructions: e.target.value.toUpperCase() })}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
