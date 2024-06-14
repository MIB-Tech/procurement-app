import React, { FC } from "react";
import { Trans } from "../../../../_core/components/Trans";
import { useAuth } from "../../../../_core/hooks/UseAuth";
import { ModelEnum } from "../../../modules/types";
import { ViewEnum } from "../../../../_core/types/ModelMapping";
import { FormView } from "../../../../_core/FormView/FormView";
import { Alert } from "react-bootstrap";
import { getRoutePrefix } from "../../../../_core/utils";
import { getAuthenticatedUser } from "../../auth/redux/AuthCRUD";
import { useDispatch } from "react-redux";
import { actions } from "../../auth";
import { useNavigate } from "react-router-dom";

export const PasswordUpdate: FC = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      {!user.passwordUpdatedAt && (
        <Alert
          variant='warning'
          className='mb-3 text-center fw-bold'
        >
          <Trans id='PASSWORD_UPDATE.ALERT' />
        </Alert>
      )}

      <FormView
        modelName={ModelEnum.User}
        onMutate={async () => {
          const { data: user } = await getAuthenticatedUser();
          if (user) {
            dispatch(actions.fulfillUser(user));
            navigate("/");
          }
        }}
        view={{
          type: ViewEnum.Update,
          fetchUri: `${getRoutePrefix(ModelEnum.User)}/me`,
          mutateUri: `${getRoutePrefix(ModelEnum.User)}/${user.id}/password`,
          fields: {
            currentPassword: true,
            plainPassword: true,
            passwordConfirm: true,
          },
        }}
      />
    </>
  );
};
