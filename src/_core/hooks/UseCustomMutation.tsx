import { FormViewType, Model, MutationMode } from "../types/ModelMapping";
import { useTrans } from "../components/Trans";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FormikErrors } from "formik/dist/types";
import { useMutation } from "react-query";
import {
  ErrorResponse,
  Input,
  SuccessResponse,
} from "../FormView/FormView.types";
import axios, { AxiosRequestConfig } from "axios";
import { queryClient } from "../../index";
import { getListingQueryKey } from "../ListingView/ListingView.utils";
import { useToastr } from "../Toastr/UseToastr";
import { ModelEnum } from "../../app/modules/types";
import { navigateOnMutate } from "../../app/routing/PrivateRoutes";
import { FormValue } from "../FormView/FormCard";

export const useCustomMutation = <M extends ModelEnum>({
  modelName,
  method = MutationMode.Post,
  navigateTo = navigateOnMutate,
  url,
  requestConfig,
}: {
  modelName: M;
  method?: MutationMode;
  url: string;
  requestConfig?: AxiosRequestConfig;
} & Pick<FormViewType<M>, "navigateTo">) => {
  const {
    createMutationError,
    error,
    createMutationSuccess,
    updateMutationSuccess,
  } = useToastr();
  const { trans } = useTrans();
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] =
    useState<FormikErrors<FormValue<M>>>();

  const mutation = useMutation<SuccessResponse<M>, ErrorResponse<M>, Input<M>>(
    (data) =>
      axios({
        method,
        url,
        data,
        ...requestConfig,
      }),
    {
      onSuccess: async ({ data }) => {
        navigate(navigateTo(data));
        await queryClient.invalidateQueries({
          queryKey: [getListingQueryKey(modelName)],
        });
        switch (method) {
          case MutationMode.Post:
            createMutationSuccess();
            break;
          case MutationMode.Put:
            updateMutationSuccess();
            break;
        }
      },
      onError: ({ response }) => {
        switch (response?.status) {
          case 422:
            const errors = response?.data.violations.reduce(
              (errors, { propertyPath, message }) => ({
                ...errors,
                [propertyPath]: message,
              }),
              {}
            );
            setValidationErrors(errors);
            error({
              title: trans({ id: "EXCEPTION.HTTP_UNPROCESSABLE_ENTITY" }),
            });
            break;
          default:
            createMutationError();
        }
      },
    }
  );

  return { ...mutation, validationErrors };
};
