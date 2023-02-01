import React, { useState, useEffect } from 'react';
import axios from 'axios';
// @mui
import Paper from '@mui/material/Paper';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import {
  Button,
  Container,
  Box,
  Link,
  Card,
  Grid,
  Avatar,
  Typography,
  CardContent,
  Popper,
  TextField,
} from '@mui/material';

import Rating from '@mui/material/Rating';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// @mui
import { styled } from '@mui/material/styles';
import SvgColor from '../components/svg-color';
import ImageBack from '../img/black.jpg';
// components
// mock
import './student.css';
// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 1 / 8)',
});
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  marginBottom: '20px',
}));
const Url = `https://bookmytutor-api.herokuapp.com`;

export default function BlogPage() {
  const [moduleCode, setModuleCode] = useState();
  const [tutors, setTutors] = useState();
  const [textInputDetails, setTextInputDetails] = useState();
  const [upcoming, setUpcoming] = useState();
  const [value, setValue] = useState();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [location2, setLocation2] = useState('');
  const [searchDone, setSearchDone] = useState(true);
  const [searchUpcoming, setSearchUpcoming] = useState(true);
  const [searchHis, setSearchHis] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleOpen3 = () => setOpen3(true);
  const handleOpen2 = () => setOpen2(true);
  const handleOpen4 = () => setOpen4(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const handleClose3 = () => setOpen3(false);
  const handleClose4 = () => setOpen4(false);

  const handleChangeLocation2 = (event: SelectChangeEvent) => {
    setLocation2(event.target.value);
  };
  const handleTextInputDetails = (e) => {
    setTextInputDetails(e.target.value);
    console.log(textInputDetails,location2,value)
  };
  const TutorSearch = async (e) => {
    e.preventDefault();

    if (moduleCode) {
      axios.get(`${Url}/api/find/tutor/modulecode/${moduleCode}`).then(
        (response) => {
          setTutors(response.data);
          console.log(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log('error');
    }
  };
  const Upcoming = async () => {
    try {
      axios.get(`${Url}/api/sessions/student/upcoming/220398756`).then((response) => {
        setUpcoming(response.data);
        console.log(response.data);
      });
    } catch (err) {
      console.log('fff');
    }
  };
  const bookSession = async (tutorId,tutorModule,tutorNumber) => {

    console.log(tutorId,tutorModule,tutorNumber)
   try {
      axios.post(`${Url}/api/sessions/student/upcoming/220398756`, { location:location2,sessionDate:value,studentNo:'220398756',tutorStudentNo:tutorNumber,  "moduleCode":tutorModule,}).then((response) => {
        setUpcoming(response);
        console.log(response);
      });
    } catch (err) {
      console.log('fff');
    } 
  };
  const handleSearch = (e) => {
    setModuleCode(e.target.value);
    console.log(moduleCode);
  };
  useEffect(() => {
    // Update the document title using the browser API
    Upcoming();
  }, []);
  return (
    <>
      <Container>
        <TextField placeholder="Search Tutors..." onChange={handleSearch} />
        <Button
          variant="contained"
          style={{ height: '55px', marginLeft: '10px', backgroundColor: 'black' }}
          onClick={TutorSearch}
        >
          Search
        </Button>
        <Box style={{ paddingTop: '50px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <div className="myContainer">
                <h1>Tutors</h1>
                <Grid xs={12}>
                  {searchDone ? (
                    <>
                      {tutors?.map((tutor, index) => (
                        <Item key={tutor.id}>
                          <Card sx={{ position: 'relative' }}>
                            <StyledCardMedia>
                              <SvgColor
                                color="paper"
                                src="/assets/icons/shape-avatar.svg"
                                sx={{
                                  width: 80,
                                  height: 36,
                                  zIndex: 9,
                                  bottom: -15,
                                  position: 'absolute',
                                  color: 'background.paper',
                                }}
                              />
                              <StyledAvatar
                                src={`../images/avatars/avatar_${index + 1}.jpg`}
                                sx={{
                                  zIndex: 9,
                                  top: 24,
                                  left: 24,
                                  width: 40,
                                  height: 40,
                                }}
                              />

                              <StyledCover src={ImageBack} />
                            </StyledCardMedia>

                            <CardContent
                              sx={{
                                pt: 4,
                              }}
                            >
                              <Typography
                                gutterBottom
                                variant="caption"
                                sx={{ color: 'text.disabled', display: 'block' }}
                              >
                                {tutor.emailAddress}
                              </Typography>

                              <StyledTitle color="inherit" variant="subtitle2" underline="hover">
                                {tutor.firstName} {tutor.lastName}
                              </StyledTitle>
                              <Typography gutterBottom variant="caption" style={{ paddingRight: '30px' }}>
                                Location2 : {tutor.availability.location2}
                              </Typography>
                              <br />
                              <Typography gutterBottom variant="caption" style={{ paddingRight: '30px' }}>
                                Days :{' '}
                                {tutor.availability.days.map((day, index) => (
                                  <span key={index}>{day.dayName} </span>
                                ))}
                              </Typography>
                              <br />
                              <Typography gutterBottom variant="caption" style={{ paddingRight: '30px' }}>
                                Module : {tutor.moduleName}
                              </Typography>

                              <StyledInfo>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}
                                >
                                  <Button
                                    onClick={handleOpen}
                                    style={{ backgroundColor: 'blue', color: 'white', marginRight: '10px' }}
                                  >
                                    Book Session
                                  </Button>
                                  <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    open={open}
                                    onClose={handleClose}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                      timeout: 500,
                                    }}
                                  >
                                    <Fade in={open}>
                                      <Box sx={style}>
                                        <Typography
                                          id="transition-modal-title"
                                          variant="h6"
                                          component="h2"
                                          style={{ paddingBottom: '20px' }}
                                        >
                                          BOOK TUTORING SESSION
                                        </Typography>
                                        <Typography id="transition-modal-description" sx={{ mt: 2 }} component={'span'}>
                                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <MobileDatePicker
                                              label="Date mobile"
                                              inputFormat="MM/DD/YYYY"
                                              value={value}
                                              onChange={(newValue) => {
                                                setValue(newValue);
                                              }}
                                              renderInput={(params) => <TextField {...params} />}
                                            />
                                            <br />
                                            <br />
                                          </LocalizationProvider>

                                          <FormControl sx={{ minWidth: 120 }}>
                                            <InputLabel id="demo-simple-select-helper-label">Location2</InputLabel>
                                            <Select
                                              labelId="demo-simple-select-helper-label"
                                              id="demo-simple-select-helper"
                                              value={location2}
                                              label="Age"
                                              onChange={handleChangeLocation2}
                                            >
                                              <MenuItem value="">
                                                <em>None</em>
                                              </MenuItem>
                                              <MenuItem value={'online'}>Online</MenuItem>
                                              <MenuItem value={'onsite'}>On-Site</MenuItem>
                                            </Select>
                                            <br />
                                            <TextField
                                              id="outlined-multiline-static"
                                              label="Details"
                                              multiline
                                              rows={4}
                                              placeholder="Details Of the Session"
                                              onChange={handleTextInputDetails}
                                            />
                                            <br />
                                            <Button style={{ backgroundColor: 'blue', color: 'white' }} onClick={()=>bookSession({tutorId:tutor.id,tutorModule:tutor.moduleName, tutorNumber:tutor.studentNo})}>
                                              Book Session
                                            </Button>
                                          </FormControl>
                                        </Typography>
                                      </Box>
                                    </Fade>
                                  </Modal>
                                  <Button onClick={handleOpen2} style={{ backgroundColor: 'black', color: 'white' }}>
                                    Report
                                  </Button>
                                  <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    open={open2}
                                    onClose={handleClose2}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                      timeout: 500,
                                    }}
                                    style={{ width: '100%' }}
                                  >
                                    <Fade in={open2}>
                                      <Box sx={style}>
                                        <Typography id="transition-modal-title" variant="h6" component="h2">
                                          Report A tutor
                                          <br />
                                          <br />
                                        </Typography>
                                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                          <TextField
                                            id="outlined-multiline-static"
                                            label="Report"
                                            multiline
                                            rows={4}
                                            defaultValue="Details Of the The Report"
                                            style={{ width: '100%' }}
                                          />
                                          <br />

                                          <Typography
                                            gutterBottom
                                            variant="caption"
                                            sx={{ color: 'text.disabled', display: 'block' }}
                                          >
                                            <br />
                                            Tutor wont be notified of your report
                                          </Typography>
                                          <Button
                                            onClick={handleOpen2}
                                            style={{ backgroundColor: 'blue', color: 'white', width: '100%' }}
                                          >
                                            Submit
                                          </Button>
                                        </Typography>
                                      </Box>
                                    </Fade>
                                  </Modal>
                                </Box>
                              </StyledInfo>
                            </CardContent>
                          </Card>
                        </Item>
                      ))}
                    </>
                  ) : (
                    <>No Tutors Found</>
                  )}
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <div className="myContainer">
                <h1> Session History</h1>
                <Grid xs={12}>
                  {searchUpcoming ? (
                    <>
                      <Item>
                        <Card sx={{ position: 'relative' }}>
                          <StyledCardMedia>
                            <SvgColor
                              color="paper"
                              src="/assets/icons/shape-avatar.svg"
                              sx={{
                                width: 80,
                                height: 36,
                                zIndex: 9,
                                bottom: -15,
                                position: 'absolute',
                                color: 'background.paper',
                              }}
                            />
                            <StyledAvatar
                              /*   src={author.avatarUrl} */
                              sx={{
                                zIndex: 9,
                                top: 24,
                                left: 24,
                                width: 40,
                                height: 40,
                              }}
                            />

                            <StyledCover src={ImageBack} />
                          </StyledCardMedia>

                          <CardContent
                            sx={{
                              pt: 4,
                            }}
                          >
                            <Typography
                              gutterBottom
                              variant="caption"
                              sx={{ color: 'text.disabled', display: 'block' }}
                            >
                              Date
                            </Typography>

                            <StyledTitle color="inherit" variant="subtitle2" underline="hover">
                              Name
                            </StyledTitle>
                            <Typography gutterBottom variant="caption" style={{ paddingRight: '30px' }}>
                              Location2 :
                            </Typography>
                            <Typography gutterBottom variant="caption" style={{ paddingRight: '30px' }}>
                              Course :
                            </Typography>

                            <StyledInfo>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                              >
                                <Button
                                  onClick={handleOpen4}
                                  style={{ backgroundColor: 'red', color: 'white', marginRight: '10px' }}
                                >
                                  Rate Session
                                </Button>

                                <Modal
                                  aria-labelledby="transition-modal-title"
                                  aria-describedby="transition-modal-description"
                                  open={open4}
                                  onClose={handleClose4}
                                  closeAfterTransition
                                  BackdropComponent={Backdrop}
                                  BackdropProps={{
                                    timeout: 500,
                                  }}
                                >
                                  <Fade in={open4}>
                                    <Box sx={style}>
                                      <Typography id="transition-modal-title" variant="h6" component="h2">
                                        Rate Your Tutor Session
                                      </Typography>
                                      <br />
                                      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                        <Rating name="size-large" defaultValue={1} size="large" />
                                      </Typography>
                                      <br />
                                      <br />
                                      <Button style={{ backgroundColor: 'blue', color: 'white', width: '100%' }}>
                                        Submit
                                      </Button>
                                    </Box>
                                  </Fade>
                                </Modal>
                              </Box>
                            </StyledInfo>
                          </CardContent>
                        </Card>
                      </Item>
                    </>
                  ) : (
                    <>No Sessions Found</>
                  )}
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <div className="myContainer">
                <h1>Upcoming Sessions</h1>
                <Grid xs={12}>
                  {searchUpcoming ? (
                    <>
                      <Item>
                        <Card sx={{ position: 'relative' }}>
                          <StyledCardMedia>
                            <SvgColor
                              color="paper"
                              src="/assets/icons/shape-avatar.svg"
                              sx={{
                                width: 80,
                                height: 36,
                                zIndex: 9,
                                bottom: -15,
                                position: 'absolute',
                                color: 'background.paper',
                              }}
                            />
                            <StyledAvatar
                              /*   src={author.avatarUrl} */
                              sx={{
                                zIndex: 9,
                                top: 24,
                                left: 24,
                                width: 40,
                                height: 40,
                              }}
                            />

                            <StyledCover src={ImageBack} />
                          </StyledCardMedia>

                          <CardContent
                            sx={{
                              pt: 4,
                            }}
                          >
                            <Typography
                              gutterBottom
                              variant="caption"
                              sx={{ color: 'text.disabled', display: 'block' }}
                            >
                              Date
                            </Typography>

                            <StyledTitle color="inherit" variant="subtitle2" underline="hover">
                              Name
                            </StyledTitle>
                            <Typography gutterBottom variant="caption" style={{ paddingRight: '30px' }}>
                              Location2 :
                            </Typography>
                            <Typography gutterBottom variant="caption" style={{ paddingRight: '30px' }}>
                              Module :
                            </Typography>

                            <StyledInfo>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                              >
                                <Button style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }}>
                                  Join Session
                                </Button>

                                <Button onClick={handleOpen3} style={{ backgroundColor: 'black', color: 'white' }}>
                                  More Details
                                </Button>
                                <Modal
                                  aria-labelledby="transition-modal-title"
                                  aria-describedby="transition-modal-description"
                                  open={open3}
                                  onClose={handleClose3}
                                  closeAfterTransition
                                  BackdropComponent={Backdrop}
                                  BackdropProps={{
                                    timeout: 500,
                                  }}
                                >
                                  <Fade in={open3}>
                                    <Box sx={style}>
                                      <Typography id="transition-modal-title" variant="h6" component="h2">
                                        Details of Tutor Session
                                      </Typography>
                                      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                        lorrrrewefsfsefe fw f w fs e fs ef wse f w 3 w e4r we rwerwrwrw rw e r w rw r wr
                                        werwe
                                      </Typography>
                                    </Box>
                                  </Fade>
                                </Modal>
                              </Box>
                            </StyledInfo>
                          </CardContent>
                        </Card>
                      </Item>
                    </>
                  ) : (
                    <>No Sessions Found</>
                  )}
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
