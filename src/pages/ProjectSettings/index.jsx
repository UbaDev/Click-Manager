import React from "react";
import PropTypes from "prop-types";

import { FormCont, FormHeading, FormElement, ActionButton } from "./Styles";
import {
  ProjectCategory,
  ProjectService,
  ProjectType,
} from "../../services/ProjectService";
import toast from "../../utils/toast";
import { getAuth } from "firebase/auth";
import { Avatar, Form, Icon, PageLoader } from "../../components";
import { Actions, SelectItem, SelectItemLabel } from "../ProjectCreate/Styles";
import { UserService } from "../../services/UserService";
import DetailsLoader from "./Loader";

const propTypes = {
  project: PropTypes.object.isRequired,
};

const ProjectSettings = ({ project }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const auth = getAuth();
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        let users = await UserService.getInstance().getUsers();

        // remove project creator from list of users
        users = users.filter(({ uid }) => uid !== project.createdBy);

        setUsers(users);
        setIsLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, []);

  if (users.length === 0) {
    return <DetailsLoader />;
  }

  return (
    <Form
      enableReinitialize
      initialValues={{
        name: project.name,
        description: project.description,
        category: project.category,
        type: project.type,
        collaborators: project.collaborators,
      }}
      validations={{
        description: Form.is.maxLength(1000),
        name: [Form.is.required(), Form.is.maxLength(200)],
        category: Form.is.required(),
        type: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        setIsLoading(true);
        try {
          await ProjectService.getInstance().updateProject({
            ...project,
            ...values,
          });
          toast.success("El proyecto se actualizó correctamente");
        } catch (error) {
          toast.error(error.message);
        }
        setIsLoading(false);
      }}
    >
      <FormElement>
        <FormHeading>Detalles del proyecto</FormHeading>
        <Form.Field.Input
          name="name"
          label="Nombre del proyecto"
          tip="El proyecto debe tener un hombre unico."
        />
        <Form.Field.TextEditor
          name="description"
          label="Descripción"
          tip="Describe el proyecto."
        />
        <Form.Field.Select
          name="category"
          label="Categoría"
          tip="Seleccione la categoría del proyecto."
          options={ProjectCategoryOptions}
        />
        <Form.Field.Select
          isMulti
          name="collaborators"
          label="Colaboradores"
          tip="Selecciones los colaboradores para el proyecto."
          options={userOptions(users)}
          renderOption={renderUser(users)}
          renderValue={renderUser(users)}
        />
        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={isLoading}>
            Guardar
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};

const ProjectCategoryOptions = Object.values(ProjectCategory).map((item) => ({
  value: item,
  label: item,
}));

const userOptions = (users) =>
  users.map((user) => ({ value: user.uid, label: user.displayName }));

const renderUser =
  (users) =>
  ({ value: userId, removeOptionValue }) => {
    const user = users.find(({ uid }) => uid === userId);
    return (
      <SelectItem
        key={user.uid}
        withBottomMargin={!!removeOptionValue}
        onClick={() => removeOptionValue && removeOptionValue()}
      >
        <Avatar size={20} avatarUrl={user.photoURL} name={user.displayName} />
        <SelectItemLabel>{user.displayName}</SelectItemLabel>
        {removeOptionValue && <Icon type="close" top={2} />}
      </SelectItem>
    );
  };

ProjectSettings.propTypes = propTypes;

export default ProjectSettings;
