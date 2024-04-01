export const mobileEventCardStyles = {
  width: "400px",
  height: 360,
  marginBottom: "20px",
  overflow: "hidden",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column", 
};

export const boxMobileEventCardStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "50vh",
};

export const mobileEventCardMediaStyles = {
  height: 200, 
  width: '100%',
  position: "relative",
  backgroundPosition: 'top'
};


export const eventCardMediaStyles = {
  aspectRatio: '16/9',
  height: 190,
  width: 280,
  position: "relative",
};

export const mobileEventCardFavoriteButtonStyles = {
  position: "absolute",
  top: 8,
  right: 8,
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
  },
};

export const mobileEventCardPriceStyles = {
  pt: 3,
  color: "text.primary",
};

export const eventCardStyles = {
  display: 'flex',
  width: '900px',
  borderRadius: '16px',
  transition: "box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
};

export const eventCardPriceStyles = {
  marginLeft: '10px',
};


export const subtitleTypography = {
  marginTop: '12px',
  display: 'flex',
  color: 'text.secondary',
}