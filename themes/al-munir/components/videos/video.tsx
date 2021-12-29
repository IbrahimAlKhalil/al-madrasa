import {FunctionComponent} from 'react';

export interface VideoInterface {
    id: number;
    description: string;
    link: string;
    date_created: string;
    user_created: {
        first_name: string;
        last_name: string;
    };
}

export const Video: FunctionComponent<VideoInterface> = (props) => {
    return (
        <article className="entry" data-aos="fade-up">
            <div className="entry-img">
                <iframe width="100%" height="360"
                        src={props.link}
                        frameBorder="0"/>
            </div>

            <div className="entry-meta">
                <ul>
                    <li className="d-flex align-items-center">
                        <i className="mi">person</i>
                        <a>{props.user_created.first_name} {props.user_created.last_name}</a>
                    </li>
                    <li className="d-flex align-items-center">
                        <i className="mi">access_time</i>
                        <a>
                            {/* TODO: add datetime attribute */}
                            <time>{props.date_created}</time>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="entry-content">
                <div>{props.description}</div>
            </div>
        </article>
    );
};
