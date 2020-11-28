import React from 'react';

const HeadLine = ({title, subtitle, heroClasses="has-background-grey-lighter", titleClasses, subtitleClasses}) => (
    <section className={`hero ${heroClasses}`}>
      <div className="hero-body">
        <div className="container">
          <h1 className={`title has-text-centered ${titleClasses}`}>
            {title}
          </h1>
          {subtitle &&
           (
               <h2 className={`subtitle has-text-centered ${subtitleClasses}`}>
                 {subtitle}
               </h2>
           )
          }
        </div>
      </div>
    </section>
);

export default HeadLine;
