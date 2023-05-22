import { Formik } from 'formik';
import * as Yup from 'yup';

import { useNavigate, useParams } from 'react-router-dom';
import { GetAuthorByID,  PutAuthor } from '../../api/AuthorReauest';
import { useEffect } from 'react';

const Style = {
  width: "50%",
  margin: "100px auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
};

const EditAuthor = () => {
  const navigate = useNavigate()
  // const [ setGlobal] = useGlobalData()
  
  const { id } = useParams();
// let [authorPut, setAuthorPut] = useState({
//         name: '',
//         surname: '',
//         image: '',
//         salary: '',
//         age: '',
//         position: '',
//   });
  useEffect(() => {
    GetAuthorByID(id).then((item) => {
      // setAuthorPut(item);
    });
  }, [id]);
  
  return (
    <>
    <>  <Formik
  initialValues={{
    name: '',
    birthyear: "",
    isDead: false,
    imageURL: "",
    isMale: "",
    genre: "",
  }}
  validationSchema={Yup.object({
    name: Yup.string().min(5,'Minimum herf sayini kecmemisiz').required('Adi bos saxlamisiz'),
    birthyear: Yup.number().integer().positive("Menfi maash olmur").required('Maash bos saxlamisiz'),
    isDead: Yup.bool().oneOf([true,false]),
    imageURL: Yup.string().min(5,"Link tamamlanmiyib").required('Image bos saxlamisiz'),
    isMale: Yup.string().required('Olmadiki cinsi secindee!').oneOf(['Man', 'Woman']),
    genre: Yup.string().required('Olmadiki janr secindee!')
      .oneOf(['thriller', 'detective',  'fantasy', 'classic']),
  })}
  onSubmit={(values, { setSubmitting, resetForm }) => {
    console.log(values);
    setTimeout(() => {
      PutAuthor(id,values)
               setSubmitting(false);
               resetForm();
               navigate("/authors")
    }, 2000);
  }}
>
  {({
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleSubmit,
    handleReset,
    handleChange,
  }) => (
    <form className="magic-form" onSubmit={handleSubmit}>
      <h3>Add Author</h3>
      <input
        id="name"
        type="text"
        placeholder="Name"
        className="input"
        value={values.name}
        onChange={handleChange}
      />
      {errors.name && touched.name && (
        <div className="input-feedback">{errors.name}</div>
      )}

      <input
        id="birthyear"
        type="number"
        placeholder="Birthyear"
        className="input"
        value={values.birthyear}
        onChange={handleChange}
      />
      {errors.birthyear && touched.birthyear && (
        <div className="input-feedback">{errors.birthyear}</div>
      )}


      <input
        id="imageURL"
        type="text"
        placeholder="imageURL"
        className="input"
        value={values.age}
        onChange={handleChange}
      />
      {errors.imageURL && touched.imageURL && (
        <div className="input-feedback">{errors.imageURL}</div>
      )}


  <select
        id="isMale"
        value={values.isMale}
        onChange={handleChange}
        style={{
          marginTop: 10,
          width: '150px',
          padding: '10px 15px',
          outline: 'none',
        }}
      >
        <option value="" label="isMale.." />
        <option value="Man" label="Man" />
        <option value="Woman" label="Woman" />
      </select>
      {errors.isMale && touched.isMale && (
        <div className="input-feedback">{errors.isMale}</div>
      )}

      <select
        id="genre"
        value={values.genre}
        onChange={handleChange}
        style={{
          marginTop: 10,
          width: '150px',
          padding: '10px 15px',
          outline: 'none',
        }}
      >
        <option value="" label="Genree.." />
        <option value="thriller" label="thriller" />
        <option value="detective" label="detective" />
        <option value="fantasy" label="fantasy" />
        <option value="classic" label="classic" />
      </select>

      {errors.genre && touched.genre && (
        <div className="input-feedback">{errors.genre}</div>
      )}

<div className="checkbox topMargin">
        <input
          id="isDead"
          type="checkbox"
          value={values.isDead}
          onChange={handleChange}
        />
        <label htmlFor="isDead" className="checkbox-label">
        isDead
        </label>
      </div>
      {errors.isDead && (
        <div className="input-feedback">{errors.isDead}</div>
      )}

      <button type="submit" disabled={!dirty || isSubmitting}>
        ADD
      </button>
    </form>
  )}
</Formik>

</>
    </>
  );
};

export default EditAuthor;
