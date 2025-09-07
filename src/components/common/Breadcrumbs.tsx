import { memo } from "react";

import { map } from "lodash";
import { useNavigate } from "react-router-dom";

import {
  CustomBreadCrumbs,
  type ICustomBreadcrumbs,
} from "../controllers/CustomBreadcrumbs";
import { localNavigateHandler } from "../../helpers/utils/handlers";

interface IBreadcrumbs extends Omit<ICustomBreadcrumbs, "breadcrumbs"> {
  breadcrumbs: IBreadcrumbsItems[];
}

export const BreadCrumbs = memo<IBreadcrumbs>(({ breadcrumbs, ...props }) => {
  const navigate = useNavigate();

  return (
    <CustomBreadCrumbs
      {...props}
      breadcrumbs={map(
        breadcrumbs,
        ({ link, name, localNavigate }): ICustomBreadcrumbsItems => ({
          name,
          link,
          clickHandler: (link) =>
            localNavigate ? localNavigateHandler(link) : navigate(link),
        })
      )}
    />
  );
});
