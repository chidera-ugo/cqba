import { AnimateLayout } from 'components/animations/AnimateLayout';
import { SelectBudgetTypeForm } from 'components/forms/budgeting/SelectBudgetTypeForm';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { CreateBudgetPrompt } from 'components/modules/budgeting/CreateBudgetPrompt';
import { ManageBudgetCreation } from 'components/modules/budgeting/ManageBudgetCreation';
import { ManageProjectCreation } from 'components/modules/budgeting/ManageProjectCreation';
import { approvalsFilterOptions } from 'constants/approvals/filters';
import { budgetingFilterOptions } from 'constants/budgeting/filters';
import { useUserRole } from 'hooks/access_control/useUserRole';
import { UseManageBudgetAndProjectCreation } from 'hooks/budgeting/useManageBudgetAndProjectCreation';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect } from 'react';

export const ManageBudgetAndProjectCreation = ({
  modal,
  setModal,
  onFinish,
  setFilters,
}: UseManageBudgetAndProjectCreation & {
  setFilters?: Dispatch<SetStateAction<Record<string, any>>>;
  onFinish?: () => void;
}) => {
  const { query, pathname, push } = useRouter();

  const { isOwner } = useUserRole();

  const showCreateProject = query['modal'] === 'create_project';

  useEffect(() => {
    if (!showCreateProject) return;
    setModal('create_project');
  }, [showCreateProject]);

  return (
    <>
      <ManageBudgetCreation
        onFinish={() => {
          if (onFinish) onFinish();

          if (setFilters)
            setFilters((prev) => ({
              ...prev,
              status: isOwner
                ? budgetingFilterOptions[0]
                : approvalsFilterOptions()[1], // Switching tabs to projects,
            }));
        }}
        show={modal === 'create_budget'}
        close={() => setModal(null)}
      />

      <ManageProjectCreation
        onFinish={() => {
          if (onFinish) onFinish();

          if (setFilters)
            setFilters((prev) => ({
              ...prev,
              status: budgetingFilterOptions[1], // Switching tabs to projects,
            }));
        }}
        close={() => setModal(null)}
        show={query['modal'] === 'create_project'}
      />

      <RightModalWrapper
        show={modal === 'choose_action' || modal === 'show_prompt'}
        title={modal !== 'show_prompt' ? 'Create New Budget' : ''}
        closeOnClickOutside
        closeModal={() => setModal(null)}
        childrenClassname={'p-0'}
      >
        <AnimateLayout
          changeTracker={String(modal)}
          className={'px-4 640:px-8'}
        >
          {modal === 'show_prompt' ? (
            <CreateBudgetPrompt
              close={close}
              createBudget={() => {
                setModal(isOwner ? 'choose_action' : 'create_budget');
              }}
            />
          ) : (
            <SelectBudgetTypeForm
              onSubmit={({ project }) => {
                if (project) {
                  push({
                    pathname,
                    query: {
                      ...query,
                      modal: 'create_project',
                    },
                  }).then(() => {
                    setModal('create_project');
                  });
                } else {
                  setModal('create_budget');
                }
              }}
            />
          )}
        </AnimateLayout>
      </RightModalWrapper>
    </>
  );
};
