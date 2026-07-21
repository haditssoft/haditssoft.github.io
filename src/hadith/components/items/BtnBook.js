import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// import imgBukhari from '../../assets/images/shahih-bukhari.jpg';
// import imgMuslim from '../../assets/images/shahih-muslim.jpg';
// import imgTirmidzi from '../../assets/images/sunan-tirmidzi.jpg';
// import imgAbuDaud from '../../assets/images/sunan-abu-daud.jpg';
// import imgNasai from '../../assets/images/sunan-nasai.jpg';
// import imgIbnuMajah from '../../assets/images/sunan-ibnu-majah.jpg';
// import imgDarimi from '../../assets/images/sunan-darimi.jpg';
// import imgAhmad from '../../assets/images/musnad-ahmad.jpg';
// import imgMalik from '../../assets/images/muwatha-malik.jpg';
// import imgDaruquthni from '../../assets/images/sunan-daruquthni.jpg';
// import imgIbnuKhuzaimah from '../../assets/images/ibnu-khuzaimah.jpg';
// import imgIbnuHibban from '../../assets/images/ibnu-hibban.jpg';
// import imgMustadrak from '../../assets/images/almustadrak.jpg';
// import imgSyafii from '../../assets/images/musnad-syafii.jpg';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'initial',
  },
  setForPadding: {
    padding: '16px 10px',
  }
});

function ImgMediaCard(props) {
  const classes = useStyles();
  const { bookName } = props;

  let imgKitab;
  switch (bookName) {
    case "Shahih Bukhari":
      imgKitab = 'https://res.cloudinary.com/gethadith/image/upload/v1568578203/books/gethadith-shahih-bukhari.jpg'; // imgBukhari;
      break;
    case "Shahih Muslim":
      imgKitab = 'https://res.cloudinary.com/gethadith/image/upload/v1568578211/books/gethadith-shahih-muslim.jpg'; // imgMuslim;
      break;
    case "Sunan Tirmidzi":
      imgKitab = 'https://res.cloudinary.com/gethadith/image/upload/v1568578260/books/gethadith-sunan-tirmidzi.jpg'; // imgTirmidzi;
      break;
    case "Sunan Abu Daud":
      imgKitab = 'https://res.cloudinary.com/gethadith/image/upload/v1568578218/books/gethadith-sunan-abu-daud.jpg'; // imgAbuDaud;
      break;
    case "Sunan Nasa'i":
      imgKitab = 'https://res.cloudinary.com/gethadith/image/upload/v1568578253/books/gethadith-sunan-nasai.jpg'; // imgNasai;
      break;
    case "Sunan Ibnu Majah":
      imgKitab = 'https://res.cloudinary.com/gethadith/image/upload/v1568578244/books/gethadith-sunan-ibnu-majah.jpg'; // imgIbnuMajah;
      break;
    case "Sunan Darimi":
      imgKitab = 'https://res.cloudinary.com/gethadith/image/upload/v1568578226/books/gethadith-sunan-darimi.jpg'; // imgDarimi;
      break;
    case "Musnad Ahmad":
      imgKitab = 'https://res.cloudinary.com/gethadith/image/upload/v1568578176/books/gethadith-musnad-ahmad.jpg'; // imgAhmad;
      break;
    case "Muwatha' Malik":
      imgKitab = 'https://res.cloudinary.com/gethadith/image/upload/v1568578192/books/gethadith-muwatha-malik.jpg'; // imgMalik;
      break;
    case "Sunan Daruquthni":
      imgKitab = 'https://res.cloudinary.com/gethadith/image/upload/v1568578235/books/gethadith-sunan-daruquthni.jpg'; // imgDaruquthni;
      break;
    case "Shahih Ibnu Khuzaimah":
      imgKitab = 'https://res.cloudinary.com/gethadith/image/upload/v1568578168/books/gethadith-shahih-ibnu-khuzaimah.jpg'; // imgIbnuKhuzaimah;
      break;
    case "Shahih Ibnu Hibban":
      imgKitab = 'https://res.cloudinary.com/gethadith/image/upload/v1568578160/books/gethadith-shahih-ibnu-hibban.jpg'; // imgIbnuHibban;
      break;
    case "Al Mustadrak":
      imgKitab = 'https://res.cloudinary.com/gethadith/image/upload/v1568578151/books/gethadith-almustadrak.jpg'; // imgMustadrak;
      break;
    default:
      imgKitab = 'https://res.cloudinary.com/gethadith/image/upload/v1568578184/books/gethadith-musnad-syafii.jpg'; // imgSyafii;
      break;
  }

  return (
    <Card className={classes.card} onClick={props.clicked}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.bookName}
          className={classes.media}
          height="120"
          image={imgKitab}
          title={props.bookName}
        />
        <CardContent className={classes.setForPadding}>
          {/* <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography> */}
          <Typography component="p" variant='subtitle2'>
            {props.bookName}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}

export default React.memo(ImgMediaCard);