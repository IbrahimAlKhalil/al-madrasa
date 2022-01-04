import { FunctionComponent } from 'react';
import Link from 'next/link';

export interface QuestionInterface {
  id: number;
  name: string;
  question: string;
  answer: string;
  commentCount: number;
  date_created: string;
}

export const Question: FunctionComponent<QuestionInterface> = (props) => {
  const intl = new Intl.NumberFormat('bn-BD');

  return (
    <div className="col-lg-4">
      <div className="post-box">
        <span className="post-date">{props.date_created}</span>

        <h3 className="post-title">প্রশ্ন - {intl.format(props.id)} - {props.name}</h3>

        <div>{props.question}</div>

        <Link href={`/articles/${props.id}`}>
          <a className="readmore stretched-link mt-auto">
            <span>আরও পড়ুন</span>
            <i className="mi">arrow_right</i>
          </a>
        </Link>
      </div>
    </div>
  );
};
