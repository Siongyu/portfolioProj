import "./animatedButton.css"
import AnimatedText from "./animatedText";
import information from "../../../data/information.json";

const ContactComponent = () => {
    return (
      <section id="contact" className="mx-auto pb-20">
        <div className="flex flex-col">
          <AnimatedText 
            text="My Social(s)"
            className="font-bold text-4xl tablet:text-5xl laptop:text-6xl desktop:text-6xl"
          />
          <div className="flex gap-4 phone:flex-col phone:items-center">
            <div className="flex-col mt-2 tablet:w-6/12 laptop:w-8/12 desktop:w-8/12">
              <span className="text-outer_space-700 tablet:text-2xl laptop:text-3xl">
                If you would like to get in touch with me for a chat, feel free to reach to me! Take a look
                at my resume as well!
              </span>
              <div className="flex gap-4 phone:justify-between">
                <button 
                  className="ui-btn 3/12 mt-4 phone:w-6/12"
                  onClick={() => window.open("mailto:loosiongyu@hotmail.com")}
                >
                  <span className="ml-2 phone:text-sm">
                    Email Me
                  </span>
                </button>
                <button 
                  className="ui-btn 3/12 mt-4 phone:w-6/12"
                  onClick={() => window.open("/siongyu_resume.pdf", "_blank", "noopener,noreferrer")}
                >
                  <span className="ml-2 phone:text-sm">
                      My Resume
                  </span>
                </button>
              </div>
            </div>
            <div className="border-l h-15 mx-3 phone:border-t phone:w-full phone:my-5"></div>
            <ul className="flex gap-4 tablet:flex-col tablet:text-2xl laptop:text-3xl laptop:flex-col desktop:flex-col">
              {information.contactInfo.map((social, socialIndex) => (
                <li key={socialIndex} className="cursor-auto">
                  <a href={social.link} className="menu__link">{social.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    )
}

export default ContactComponent;