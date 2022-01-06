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
interface Props extends PageProps {
  noDB?: boolean;
  data?: any;
}

const Admission: NextPage<Props> = (props) => {
  console.log(props.data);
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
  if (props.noDB) {
    return <h1>Error</h1>;
  }
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
                        name="StudentName"
                        required
                      />
                    </div>

                    <div className="col-md-6 form-group">
                      <label htmlFor="fatherName">পিতার নাম</label>

                      <input
                        className="form-control"
                        name="FatherName"
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
                        name="MotherName"
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
                        name="DateOfBirth"
                        required
                      />
                    </div>

                    <div className="col-md-6 form-group">
                      <label htmlFor="gender">লিঙ্গ</label>

                      <select
                        placeholder="লিঙ্গ"
                        className="form-control"
                        name="Gender"
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
                        name="BloodGroup"
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
                        name="AbasikOnabasik"
                        required
                      >
                        <option value={1}>আবাসিক</option>
                        <option value={2}>অনাবাসিক</option>
                        <option value={3}>ডে-কেয়ার</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="SessionID">সেশন</label>
                      <select
                        className="form-control"
                        name="SessionID"
                        required
                      >
                        <option value={1}>আবাসিক</option>
                        <option value={2}>অনাবাসিক</option>
                        <option value={3}>ডে-কেয়ার</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="ClassID"> ক্লাস </label>
                      <select
                        placeholder="জামাত"
                        className="form-control"
                        name="ClassID"
                        required
                      >
                        <option value={1}>আবাসিক</option>
                        <option value={2}>অনাবাসিক</option>
                        <option value={3}>ডে-কেয়ার</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="NationalID">জাতিয় পরিচয়পত্র</label>
                      <input
                        id="NationalID"
                        placeholder="পরিচয়পত্রের নাম্বার"
                        className="form-control"
                        type="text"
                        name="NationalID"
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
                        name="ResideVill"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        placeholder="ডাক"
                        className="form-control"
                        type="text"
                        name="ResidePost"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        placeholder="থানা"
                        className="form-control"
                        type="text"
                        name="ResideThana"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        placeholder="জেলা"
                        className="form-control"
                        type="text"
                        name="ResideJela"
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
                        name="TransientVill"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        placeholder="ডাক"
                        className="form-control"
                        type="text"
                        name="TransientPost"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        placeholder="থানা"
                        className="form-control"
                        type="text"
                        name="TransientThana"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        placeholder="জেলা"
                        className="form-control"
                        type="text"
                        name="TransientJela"
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
                        type="text"
                        name="Mobile1"
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        placeholder="সম্পর্ক ১"
                        className="form-control"
                        type="text"
                        name="Reletion1"
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        placeholder="মোবাইল ২"
                        className="form-control"
                        type="text"
                        name="Mobile2"
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        placeholder="সম্পর্ক ২"
                        className="form-control"
                        type="text"
                        name="Reletion2"
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
    if (!ctx.req.qmmsoftDB) {
      return { noDB: true };
    }
    const database = knex({
      client: 'mssql',
      connection: {
        server: process.env.DB_MSSQL_HOST as string,
        user: process.env.DB_MSSQL_USER as string,
        password: process.env.DB_MSSQL_PASSWORD as string,
        database: ctx.req.qmmsoftDB,
        port: Number(process.env.DB_MSSQL_PORT),
      },
    });

    const classNames = await database('Class').select('ClassName', 'Cid');
    await database.destroy();
    return { data: classNames };
  },
);

export default Admission;
