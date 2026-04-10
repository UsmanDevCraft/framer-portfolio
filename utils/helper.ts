export const downloadCV = () => {
  const cvUrl = "/Usman_awan_FSE_CV.pdf";
  const link = document.createElement("a");
  link.href = cvUrl;
  link.download = "Usman_awan_CV";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
