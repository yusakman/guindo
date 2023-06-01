import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./styles.module.scss";
import { faqList } from "./data.js";
import { Card, CardContent } from "@mui/material";

const FAQ = () => {
  return (
    <div className={styles[`faq`]} id="faq">
      <div className={styles[`faq-title`]}>
        <p>FAQ</p>
      </div>
      {faqList.map((item, index) => {
        return (
          <div className={styles[`faq-container`]} key={index}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{item.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
    </div>
  );
};

export default FAQ;
