import { getServerSidePageProps } from 'm/get-server-side-page-props';
import { PageProps } from 'shared/dist/types/page-props';
import { LayoutWide } from '../../layout/layout-wide';
import { Page } from 'shared/dist/components/page';
import { FormEventHandler, MouseEventHandler, useState } from 'react';
import { loadRelations } from 'm/load-relations';
import { NextPage } from 'next';
import Head from 'next/head';
// @ts-ignore
import ToUnicodePipe from 'shared/dist/modules/to-unicode';
import knex from 'knex';

interface Props extends PageProps {
  noDB?: boolean;
  clsData?: any;
  sessionData?: any;
}

const Admission: NextPage<Props> = (props) => {
  const [status, changeStatus] = useState('idle');
  const [error, setError] = useState(''); // for showing error messages
  const [sData, setData] = useState({
    FatherName: '',
    MotherName: '',
    StudentName: '',
    ID: '',
    Session: '',
    RegID: '',
    RegDate: '',
  }); //state for students info

  // find student information with id
  const findStudent: FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    const request = await fetch(`/api/admission/${evt.currentTarget.getElementById('old_id').value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setError('no_err');
    const studentInfo = await request.json();
    if (studentInfo.errors) {
      setError('id_err');
    }
    setData(studentInfo);
  };

  // submit new student information
  const submit: FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    const formData = new FormData(evt.currentTarget);
    const request = await fetch('/api/admission', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData.entries())),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    changeStatus('loading');

    if (request.status === 422) {
      changeStatus('error');
    } else {
      setTimeout(() => {
        changeStatus('idle');
      }, 5000);
      changeStatus('success');
    }
  };

  //register old student
  const RegStudent: MouseEventHandler<HTMLButtonElement> = async () => {
    if (sData.ID) {
      const request = await fetch(`/api/admission/${sData.ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const response = await request.json();
      if (response.error) {
        setError('reg_err');
      } else {
        setError('reg_success');
      }
    } else {
      setError('id_err');
    }
  };

  //save unicoded class objects in here
  const classArr: { id: number; name: string }[] = [];
  if (props.clsData) {
    const uniCode = new ToUnicodePipe();
    props.clsData.map((obj: { ClassName: string; Cid: number }) => {
      const bnData = uniCode.transform(obj.ClassName);
      classArr.push({
        id: obj.Cid,
        name: bnData,
      });
    });
  }
  //save in globel for use in template
  const sessions: {
    ID: number;
    SessionName: number;
    HizriName: number;
  }[] = props.sessionData;

  if (props.noDB) {
    return (
      <div className="alert alert-warning" role="alert">
        অনুগ্রহ করে আমাদের সাপোর্ট এ যোগাযোগ করুন
      </div>
    );
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
                        {sessions.map((ses) => {
                          return (
                            <option key={ses.ID} value={ses.ID}>
                              {ses.SessionName} ({ses.HizriName})
                            </option>
                          );
                        })}
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
                        {classArr.map((clsObj) => {
                          return (
                            <option key={clsObj.id} value={clsObj.id}>
                              {clsObj.name}
                            </option>
                          );
                        })}
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
                  onSubmit={findStudent}
                >
                  <div className="row gy-4 justify-content-center">
                    <div className="col-md-6 form-group text-center">
                      <label htmlFor="name">আইডি</label>

                      <input
                        className="form-control text-center"
                        type="text"
                        id="old_id"
                        name="id"
                      />
                    </div>
                    <div className="col-md-12 text-center">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#ApplyForOldStudnt"
                      >
                        অনুসন্ধান
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <br />
      </LayoutWide>

      <div
        className="modal fade"
        id="ApplyForOldStudnt"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                নিবন্ধন
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body p-5">
              {error === 'no_err' ? (
                <table className="table">
                  <tbody>
                    <tr>
                      <td>নামঃ</td>
                      <td>{sData.StudentName}</td>
                    </tr>
                    <tr>
                      <td>পিতার নামঃ</td>
                      <td>{sData.FatherName}</td>
                    </tr>
                    <tr>
                      <td>মাতার নামঃ</td>
                      <td>{sData.MotherName}</td>
                    </tr>
                    <tr>
                      <td>সেশনঃ</td>
                      <td>{sData.Session}</td>
                    </tr>
                    <tr>
                      <td>নিবন্ধন নংঃ</td>
                      <td>{sData.RegID}</td>
                    </tr>
                    <tr>
                      <td>আবেদনের তারিখঃ</td>
                      <td>{sData.RegDate}</td>
                    </tr>
                  </tbody>
                </table>
              ) : null}
              {error === 'id_err' ? (
                <div className="alert alert-danger" role="alert">
                  আপনার আইডিটি সঠিক নয়।
                </div>
              ) : null}
              {error === 'reg_success' ? (
                <div className="alert alert-success" role="alert">
                  নিবন্ধন সফল হয়েছে
                </div>
              ) : null}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className={`btn btn-success ${
                  error === 'reg_success' || sData.RegID ? 'd-none' : ''
                }`}
                onClick={RegStudent}
              >
                নিবন্ধন করুন
              </button>
            </div>
          </div>
        </div>
      </div>
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

    //getting datas from DB
    const classNames = await database('Class').select('ClassName', 'Cid');
    const SessionNames = await database('Sessiontbl').select(
      'ID',
      'SessionName',
      'HizriName',
    );

    await database.destroy();

    if (classNames && SessionNames) {
      return {
        clsData: classNames,
        sessionData: SessionNames,
      };
    } else {
      return { noDB: true };
    }
  },
);

export default Admission;
