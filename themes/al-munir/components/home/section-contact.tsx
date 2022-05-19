import {
  FormEventHandler,
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import { SectionProps } from 'shared/types/section-props';

interface TileInterface {
  title: string;
  icon: string;
  content: string;
}

const Tile: FunctionComponent<TileInterface> = (props) => {
  return (
    <div className="col-md-6">
      <div className="info-box">
        <i className="mi">{props.icon}</i>
        <h3>{props.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: props.content }} />
      </div>
    </div>
  );
};

export const SectionContact: FunctionComponent<SectionProps> = (props) => {
  const data = props.data?.value;

  if (!data) {
    return null;
  }

  const [name, changeName] = useState('');
  const [email, changeEmail] = useState('');
  const [message, changeMessage] = useState('');
  const [status, changeStatus] = useState('idle');
  const [questionType, changeQuestionType] = useState('');
  const [questionTypes, loadQuestionTypes] = useState<
    { id: number; name: string }[]
  >([]);

  useEffect(() => {
    fetch('/api/items/question_type?fields=id,name')
      .then((res) => res.json())
      .then((data) => {
        loadQuestionTypes(data.data);
      });
  }, []);

  const submit: FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    changeStatus('loading');

    const response = await fetch(`/api/contact`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
        questionType: questionType || questionTypes[0].id,
      }),
      method: 'POST',
    });

    if (response.status === 200 || response.status === 201) {
      changeStatus('success');

      setTimeout(() => {
        changeStatus('idle');
      }, 5000);
    } else {
      changeStatus('error');
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container" data-aos="fade-up">
        <header className="section-header">
          <h2>{data.title}</h2>
          <h3>{data.subtitle}</h3>
        </header>

        <div className="row gy-4">
          <div className="col-lg-6">
            <div className="row gy-4">
              {data.tiles.map((tile: TileInterface) => (
                <Tile key={tile.title} {...tile} />
              ))}
            </div>
          </div>

          <div className="col-lg-6">
            <form method="post" className="php-email-form" onSubmit={submit}>
              <div className="row gy-4">
                <div className="col-md-6">
                  <input
                    onInput={(evt) => changeName(evt.currentTarget.value)}
                    className="form-control"
                    placeholder="আপনার নাম"
                    value={name}
                    type="text"
                    name="name"
                    required
                  />
                </div>

                <div className="col-md-6 ">
                  <input
                    onInput={(evt) => changeEmail(evt.currentTarget.value)}
                    placeholder="ইমেইল ঠিকানা"
                    className="form-control"
                    value={email}
                    type="email"
                    name="email"
                    required
                  />
                </div>

                <div className="col-md-12">
                  <select
                    onInput={(evt) =>
                      changeQuestionType(evt.currentTarget.value)
                    }
                    className="form-control"
                    value={questionType}
                    name="questionType"
                    placeholder="ধরন"
                    required
                  >
                    {questionTypes &&
                      questionTypes.map((qt) => (
                        <option key={qt.id} value={qt.id}>
                          {qt.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="col-md-12">
                  <textarea
                    onInput={(evt) => changeMessage(evt.currentTarget.value)}
                    placeholder="আপনার জিজ্ঞাসা"
                    className="form-control"
                    value={message}
                    name="message"
                    rows={6}
                    required
                  />
                </div>

                <div className="col-md-12 text-center">
                  {status === 'loading' ? (
                    <div className="loading">লোড হচ্ছে</div>
                  ) : null}

                  {status === 'error' ? (
                    <div className="error-message">
                      ক্রিটিক্যাল সমস্যার জন্য মেসেজ পাঠানো সম্ভব হচ্ছেনা, দয়া
                      করে কিছুক্ষন পর আবার চেষ্টা করুন
                    </div>
                  ) : null}

                  {status === 'success' ? (
                    <div className="sent-message">
                      আমরা আপনার মেসেজটি পেয়েছি. ধন্যবাদ!
                    </div>
                  ) : null}

                  <button type="submit">পাঠান</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
