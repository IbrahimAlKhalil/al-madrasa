import { getServerSidePageProps } from 'm/get-server-side-page-props';
import { PageProps } from 'shared/dist/types/page-props';
import { LayoutWide } from '../../layout/layout-wide';
import { Page } from 'shared/dist/components/page';
import { FormEventHandler, useState } from 'react';
import { loadRelations } from 'm/load-relations';
import { NextPage } from 'next';
import Head from 'next/head';
import knex from 'knex';

// type Props = PageProps;

const Admission: NextPage<PageProps> = (props) => {
  const [status, changeStatus] = useState('idle');
  const submit: FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const formData = new FormData(evt.target);
    const request = await fetch('/api/admission', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData.entries())),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    changeStatus('loading');

    if (request.status === 422) {
      console.log(request.status);
      changeStatus('error');
    } else {
      setTimeout(() => {
        changeStatus('idle');
      }, 5000);
      changeStatus('success');
    }
  };

  return (
    <Page pageProps={props}>
      <LayoutWide>
        <Head>
          <title>অনলাইন ভর্তি আবেদন</title>
        </Head>

        <br />
        <br />

        <section id="contact" className="contact">
          <header className="section-header">
            <h3>অনলাইন ভর্তি আবেদন</h3>
          </header>

          <div className="container" data-aos="fade-up">
            <ul className="nav nav-tabs" id="admission-form" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="new-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#new"
                  type="button"
                  role="tab"
                  aria-controls="new"
                  aria-selected="true"
                >
                  নতুন
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="old-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#old"
                  type="button"
                  role="tab"
                  aria-controls="old"
                  aria-selected="true"
                >
                  পুরাতন
                </button>
              </li>
            </ul>
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="new"
                role="tabpanel"
                aria-labelledby="new-tab"
              >
                <form
                  method="post"
                  className="php-email-form"
                  onSubmit={submit}
                >
                  <div className="row gy-4">
                    <div className="col-md-12">
                      <h3>সাধারণ তথ্য</h3>
                    </div>

                    <div className="col-md-6 form-group">
                      <label htmlFor="name">নাম</label>

                      <input
                        className="form-control"
                        type="text"
                        id="name"
                        name="name"
                        required
                      />
                    </div>

                    <div className="col-md-6 form-group">
                      <label htmlFor="fatherName">পিতার নাম</label>

                      <input
                        className="form-control"
                        name="fatherName"
                        id="fatherName"
                        type="text"
                        required
                      />
                    </div>

                    <div className="col-md-6 form-group">
                      <label htmlFor="motherName">মাতার নাম</label>

                      <input
                        className="form-control"
                        placeholder="মাতার নাম"
                        type="text"
                        id="motherName"
                        name="motherName"
                        required
                      />
                    </div>

                    <div className="col-md-6 form-group">
                      <label htmlFor="dateOfBirth">জন্ম তারিখ</label>

                      <input
                        placeholder="জন্ম তারিখ"
                        data-date-format="DD MMMM YYYY"
                        className="form-control"
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        required
                      />
                    </div>

                    <div className="col-md-6 form-group">
                      <label htmlFor="gender">লিঙ্গ</label>

                      <select
                        placeholder="লিঙ্গ"
                        className="form-control"
                        name="gender"
                        id="gender"
                        required
                      >
                        <option value={1}>ছাত্র</option>
                        <option value={2}>ছাত্রী</option>
                      </select>
                    </div>

                    <div className="col-md-6 form-group">
                      <label htmlFor="bloodGroup">রক্তের গ্রুপ</label>

                      <select
                        placeholder="রক্তের গ্রুপ"
                        className="form-control"
                        name="bloodGroup"
                        id="bloodGroup"
                        required
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>

                    <div className="col-md-6 form-group">
                      <label htmlFor="abasikAnabasik">
                        আবাসিক / অনাবাসিক / ডে-কেয়ার
                      </label>

                      <select
                        className="form-control"
                        id="abasikAnabasik"
                        name="abasikAnabasik"
                        required
                      >
                        <option value={1}>আবাসিক</option>
                        <option value={2}>অনাবাসিক</option>
                        <option value={3}>ডে-কেয়ার</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="abasikAnabasik">সেশন</label>
                      <select className="form-control" name="session" required>
                        <option value={1}>আবাসিক</option>
                        <option value={2}>অনাবাসিক</option>
                        <option value={3}>ডে-কেয়ার</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="abasikAnabasik"> ক্লাস </label>
                      <select
                        placeholder="জামাত"
                        className="form-control"
                        name="class"
                        required
                      >
                        <option value={1}>আবাসিক</option>
                        <option value={2}>অনাবাসিক</option>
                        <option value={3}>ডে-কেয়ার</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="nid">জাতিয় পরিচয়পত্র</label>
                      <input
                        placeholder="পরিচয়পত্রের নাম্বার"
                        className="form-control"
                        type="text"
                        name="nid"
                        required
                      />
                    </div>

                    <div className="col-md-12">
                      <h3>স্থায়ি ঠিকানা</h3>
                    </div>

                    <div className="col-md-6">
                      <input
                        placeholder="গ্রাম"
                        className="form-control"
                        type="text"
                        name="residevillage"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        placeholder="ডাক"
                        className="form-control"
                        type="text"
                        name="residePost"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        placeholder="থানা"
                        className="form-control"
                        type="text"
                        name="resideThana"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        placeholder="জেলা"
                        className="form-control"
                        type="text"
                        name="resideJela"
                        required
                      />
                    </div>

                    <div className="col-md-12">
                      <h3>বর্তমান ঠিকানা</h3>
                    </div>

                    <div className="col-md-6">
                      <input
                        placeholder="গ্রাম"
                        className="form-control"
                        type="text"
                        name="transientVillage"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        placeholder="ডাক"
                        className="form-control"
                        type="text"
                        name="transientPost"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        placeholder="থানা"
                        className="form-control"
                        type="text"
                        name="transientThana"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        placeholder="জেলা"
                        className="form-control"
                        type="text"
                        name="transientJela"
                        required
                      />
                    </div>

                    <div className="col-md-12">
                      <h3>অন্যন্ন</h3>
                    </div>

                    <div className="col-md-6">
                      <input
                        placeholder="মোবাইল ১"
                        className="form-control"
                        type="email"
                        name="email"
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        placeholder="সম্পর্ক ১"
                        className="form-control"
                        type="email"
                        name="email"
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        placeholder="মোবাইল ২"
                        className="form-control"
                        type="email"
                        name="email"
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        placeholder="সম্পর্ক ২"
                        className="form-control"
                        type="email"
                        name="email"
                      />
                    </div>

                    <div className="col-md-12 text-center">
                      {status === 'loading' ? (
                        <div className="loading">লোড হচ্ছে</div>
                      ) : null}

                      {status === 'error' ? (
                        <div className="error-message">
                          ক্রিটিক্যাল সমস্যার জন্য আবেদন করা সম্ভব হচ্ছেনা, দয়া
                          করে কিছুক্ষন পর আবার চেষ্টা করুন
                        </div>
                      ) : null}

                      {status === 'success' ? (
                        <div className="sent-message">আবেদন সফল!</div>
                      ) : null}

                      <button type="submit">পাঠান</button>
                    </div>
                  </div>
                </form>
              </div>

              <div
                className="tab-pane fade show "
                aria-labelledby="old-tab"
                role="tabpanel"
                id="old"
              >
                <form
                  method="post"
                  className="php-email-form"
                  onSubmit={submit}
                >
                  <div className="row gy-4 justify-content-center">
                    <div className="col-md-6 form-group text-center">
                      <label htmlFor="name">আইডি</label>

                      <input
                        className="form-control text-center"
                        type="text"
                        id="old_id"
                        name="id"
                        required
                      />
                    </div>

                    <div className="col-md-12 text-center">
                      {status === 'loading' ? (
                        <div className="loading">লোড হচ্ছে</div>
                      ) : null}

                      {status === 'error' ? (
                        <div className="error-message">
                          ক্রিটিক্যাল সমস্যার জন্য আবেদন করা সম্ভব হচ্ছেনা, দয়া
                          করে কিছুক্ষন পর আবার চেষ্টা করুন
                        </div>
                      ) : null}

                      <button type="submit">অনুসন্ধান</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <br />
      </LayoutWide>
    </Page>
  );
};

export const getServerSideProps = getServerSidePageProps(
  ['general'],
  async (props, ctx) => {
    await loadRelations(props, ctx);
    const database = knex({
      client: 'mssql',
      connection: {
        server: process.env.DB_MSSQL_HOST as string,
        user: process.env.DB_MSSQL_USER as string,
        password: process.env.DB_MSSQL_HOST as string,
        database: '1003_Ranavola',
        port: Number(process.env.DBJ_MSSQL_PORT),
      },
    });

    await database.destroy();
  },
);

export default Admission;
