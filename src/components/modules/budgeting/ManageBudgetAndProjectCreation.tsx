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
  isTransferFlow,
  createBudget,
  setFilters,
}: UseManageBudgetAndProjectCreation & {
  setFilters?: Dispatch<SetStateAction<Record<string, any>>>;
  onFinish?: (type: string) => void;
  isTransferFlow?: boolean;
}) => {
  const { query, pathname, push } = useRouter();

  const { isOwner } = useUserRole();

  const showCreateProject = query['modal'] === 'create_project';

  useEffect(() => {
    if (!showCreateProject) return;

    setModal('create_project');
  }, [showCreateProject]);

  function handleClose() {
    setModal(null);
  }

  return (
    <>
      <ManageBudgetCreation
        onFinish={() => {
          if (onFinish) onFinish('budget');

          if (setFilters)
            setFilters((prev) => ({
              ...prev,
              status: isOwner
                ? budgetingFilterOptions[0]
                : approvalsFilterOptions()[2], // Switching tabs to projects,
            }));
        }}
        show={modal === 'create_budget'}
        close={handleClose}
      />

      <ManageProjectCreation
        onFinish={() => {
          if (onFinish) onFinish('project');

          if (setFilters)
            setFilters((prev) => ({
              ...prev,
              status: budgetingFilterOptions[1], // Switching tabs to projects,
            }));
        }}
        isTransferFlow={isTransferFlow}
        close={handleClose}
        show={query['modal'] === 'create_project'}
      />

      <RightModalWrapper
        show={modal === 'choose_action' || modal === 'show_prompt'}
        title={modal !== 'show_prompt' ? 'Create New Budget' : ''}
        closeOnClickOutside
        closeModal={handleClose}
        childrenClassname={'p-0'}
      >
        <AnimateLayout
          changeTracker={String(modal)}
          className={'px-4 640:px-8'}
        >
          {modal === 'show_prompt' ? (
            <CreateBudgetPrompt
              close={handleClose}
              createBudget={createBudget}
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
