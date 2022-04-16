import { Field, Form } from "react-final-form";
import classes from "./form.module.css";

type PropsType = {
  onSubmit: (post: string) => void
}

const PostsForm = (props: PropsType) => {
  const onSubmit = (data: any) => {
    props.onSubmit(data.post);
    data.post = "";
  };
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name="post">{({ input }) => <textarea className={classes.textarea} {...input} />}</Field>
          <button className={classes.btn_add_post} type="submit">Post</button>
        </form>
      )}
    />
  );
};

export default PostsForm;
