import * as React from 'react'
import { ISurvey, ConstituencyLevel } from '../../reducers/index';
import { Card } from '../Card';
import { SurveyAnswer } from '../SurveyAnswer';

interface ISurveyProps {
  survey: ISurvey;
  submitted: boolean;
  onSubmit: () => any;
};

export class Survey extends React.Component<ISurveyProps, {}> {
  render() {
    const survey = this.props.survey;

    const surveyQuestions = survey.questions.map((question, cardNumber) => {
      return (
        <Card
          key={cardNumber}
          cardNumber={cardNumber + 1}
          question={question.title}
          description={question.description}
          optionType="radio"
          options={question.options}/>
      );
    });

    const surveyAnswers = survey.questions.map((question, questionNumber) => {
      return (
        <SurveyAnswer
          questionTitle={question.title}
          questionDescription={question.description}
          questionOptions={question.options}/>
      )
    });

    return (
      <section className="survey-content">
        <section className="author-info">
          <section className="author-constituency">
            <div className="constituency-level">
              <img src="https://cdn1.iconfinder.com/data/icons/mirrored-twins-icon-set-hollow/512/PixelKit_point_marker_icon.png" />
              <span>{survey.author.constituency.level}</span>
            </div>
            <span className="constituency-population">{survey.author.constituency.population}</span>
            <div className="constituency-location">
              <span className="location-displayname">{survey.author.constituency.location}</span>
              <span className="location-coordinates">{survey.author.constituency.coordinates}</span>
            </div>
          </section>
          <section className="author-details">
            <img src={survey.author.imageUrl} />
            <div className="author-details-text">
              <span className="author-name">{survey.author.displayName}, </span><span>{survey.author.title}</span>
              <span className="author-affiliation">{survey.author.politicalParty}</span>
            </div>
          </section>
        </section>
        {
          this.props.submitted
            ? (
                <section className="survey-answers">
                  {surveyAnswers}
                </section>              )
            : (
                <section className="survey-questions">
                  {surveyQuestions}
                  <button onClick={this.props.onSubmit}>
                    Submit
                  </button>
                </section>
              )
        }
      </section>
    );
  }
}
